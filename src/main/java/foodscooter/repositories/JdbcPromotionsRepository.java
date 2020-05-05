package foodscooter.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import foodscooter.model.Promotion;
import foodscooter.repositories.specifications.PromotionsRepository;
import foodscooter.repositories.util.IdGenerator;

@Repository
public class JdbcPromotionsRepository implements PromotionsRepository {
  private final JdbcTemplate jdbcTemplate;
  private final IdGenerator idGenerator;

  @Autowired
  public JdbcPromotionsRepository(JdbcTemplate jdbcTemplate, IdGenerator idGenerator) {this.jdbcTemplate = jdbcTemplate;
    this.idGenerator = idGenerator;
  }

  @Override
  public void addRestaurantPromotion(int restaurantId, Promotion promotion) {
    int promotionId = idGenerator.generate("pid", "Promotions");

    // Add to Promotions table first
    jdbcTemplate.update("INSERT INTO Promotions "
      + "VALUES(?, ?, ?, ?, ?);",
      promotionId, promotion.getStartDay(), promotion.getEndDay(),
      promotion.getType(), promotion.getDiscount());

    // Add to RestaurantPromotions table
    jdbcTemplate.update("INSERT INTO RestaurantPromotions "
      + "VALUES(?, ?);",
      restaurantId, promotionId);
  }

  @Override
  public void updateRestaurantPromotion(int restaurantId, int promotionId, Promotion promotion) {
    jdbcTemplate.update("UPDATE Promotions "
      + "SET startDate = ?, "
      + "endDate = ?, "
      + "type = ?, "
      + "discount = ? "
      + "WHERE pid = ?;",
      promotion.getStartDay(), promotion.getEndDay(),
      promotion.getType(), promotion.getDiscount(), promotionId);
  }

  @Override
  public void removeRestaurantPromotion(int restaurantId, int promotionId) {
    jdbcTemplate.update("DELETE FROM Promotions"
      + "WHERE pid = ?;", promotionId);
  }
}
