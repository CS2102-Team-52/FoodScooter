package foodscooter.repositories;

import foodscooter.model.PromotionType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import foodscooter.model.Promotion;
import foodscooter.repositories.specifications.PromotionsRepository;
import foodscooter.repositories.util.IdGenerator;

import java.util.Collection;

@Repository
public class JdbcPromotionsRepository implements PromotionsRepository {
  private final JdbcTemplate jdbcTemplate;
  private final IdGenerator idGenerator;

  @Autowired
  public JdbcPromotionsRepository(JdbcTemplate jdbcTemplate, IdGenerator idGenerator) {this.jdbcTemplate = jdbcTemplate;
    this.idGenerator = idGenerator;
  }

  @Override
  public Collection<Promotion> getPromotionsForRestaurant(int restaurantId) {
    return jdbcTemplate.query(
      "SELECT P.pid, P.name, P.startDate, P.endDate, P.type, P.discount "
      + "FROM Promotions P NATURAL JOIN RestaurantPromotions RP "
      + "WHERE RP.rid = ?;",
      new Object[] { restaurantId },
      (rs, rowNum) -> new Promotion(
        rs.getInt(1),
        rs.getString(2),
        rs.getTimestamp(3).toLocalDateTime(),
        rs.getTimestamp(4).toLocalDateTime(),
        PromotionType.map(rs.getString(5)),
        rs.getBigDecimal(6)
      )
    );
  }

  @Override
  public void addRestaurantPromotion(int restaurantId, Promotion promotion) {
    int promotionId = idGenerator.generate("pid", "Promotions");

    // Add to Promotions table first
    jdbcTemplate.update(
      "INSERT INTO Promotions "
      + "VALUES(?, ?, ?, ?, ?, ?);",
      promotionId, promotion.getName(), promotion.getStartDate(), promotion.getEndDate(),
      promotion.getType().toString(), promotion.getDiscount()
    );

    // Add to RestaurantPromotions table
    jdbcTemplate.update(
      "INSERT INTO RestaurantPromotions "
      + "VALUES(?, ?);",
      restaurantId, promotionId
    );
  }

  @Override
  public void updateRestaurantPromotion(int restaurantId, int promotionId, Promotion promotion) {
    jdbcTemplate.update(
      "UPDATE Promotions "
      + "SET name = ?, "
      + "startDate = ?, "
      + "endDate = ?, "
      + "type = ?, "
      + "discount = ? "
      + "WHERE pid = ?;",
      promotion.getName(), promotion.getStartDate(), promotion.getEndDate(),
      promotion.getType(), promotion.getDiscount(), promotionId
    );
  }

  @Override
  public void removeRestaurantPromotion(int restaurantId, int promotionId) {
    jdbcTemplate.update(
      "DELETE FROM Promotions "
      + "WHERE pid = ?;",
      promotionId
    );
  }
}