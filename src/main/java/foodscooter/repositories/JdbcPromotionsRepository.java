package foodscooter.repositories;

import foodscooter.model.PromotionType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import foodscooter.model.Promotion;
import foodscooter.repositories.specifications.PromotionsRepository;
import foodscooter.repositories.util.IdGenerator;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Repository
public class JdbcPromotionsRepository implements PromotionsRepository {
  private final JdbcTemplate jdbcTemplate;
  private final IdGenerator idGenerator;

  @Autowired
  public JdbcPromotionsRepository(JdbcTemplate jdbcTemplate, IdGenerator idGenerator) {this.jdbcTemplate = jdbcTemplate;
    this.idGenerator = idGenerator;
  }

  @Override
  public Collection<Promotion> getPromotions() {
    return jdbcTemplate.query(
      "SELECT P.pid, P.name, P.startDate, P.endDate, P.type, P.discount "
      + "FROM Promotions P "
      + "WHERE NOT EXISTS ("
      + "SELECT 1 "
      + "FROM RestaurantPromotions RP "
      + "WHERE RP.pid = P.pid "
      + "AND rid IS NOT NULL "
      + "); ",
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
  public void addPromotion(Promotion promotion) {
    int promotionId = idGenerator.generate("pid", "Promotions");
    jdbcTemplate.update(
      "INSERT INTO Promotions "
      + "VALUES (?, ?, ?, ?, ?, ?);",
      promotionId, promotion.getName(), promotion.getStartDate(),
      promotion.getEndDate(), promotion.getType().toString(), promotion.getDiscount()
    );
  }

  @Override
  public void updatePromotion(int promotionId, Promotion promotion) {
    jdbcTemplate.update(
      "UPDATE Promotions "
      + "SET name = ?, "
      + "startDate = ?, "
      + "endDate = ?, "
      + "type = ?, "
      + "discount = ? "
      + "WHERE pid = ?;",
      promotion.getName(), promotion.getStartDate(), promotion.getEndDate(),
      promotion.getType().toString(), promotion.getDiscount(), promotionId
    );
  }

  @Override
  public void removePromotions(List<Integer> promotionIds) {
    Collections.sort(promotionIds);
    int firstPromotionId = promotionIds.get(0);
    int lastPromotionId = promotionIds.get(promotionIds.size() - 1);
    jdbcTemplate.update(
      "DELETE FROM Promotions "
      + "WHERE pid BETWEEN ? AND ?; ",
      firstPromotionId, lastPromotionId
    );
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
      promotion.getType().toString(), promotion.getDiscount(), promotionId
    );
  }

  @Override
  public void removeRestaurantPromotions(int restaurantId, List<Integer> promotionIds) {
    Collections.sort(promotionIds);
    int firstPromotionId = promotionIds.get(0);
    int lastPromotionId = promotionIds.get(promotionIds.size() - 1);
    jdbcTemplate.update(
      "DELETE FROM RestaurantPromotions "
      + "WHERE rid = ? "
      + "AND pid BETWEEN ? AND ?; ",
      restaurantId, firstPromotionId, lastPromotionId
    );
  }
}
