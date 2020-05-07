package foodscooter.repositories;

import foodscooter.model.reviews.CustomerReview;
import foodscooter.model.reviews.FoodReview;
import foodscooter.model.reviews.Feedback;
import foodscooter.repositories.specifications.ReviewsRepository;
import foodscooter.repositories.util.IdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class JdbcReviewsRepository implements ReviewsRepository {
  private final JdbcTemplate jdbcTemplate;
  private final IdGenerator idGenerator;

  @Autowired
  public JdbcReviewsRepository(
    JdbcTemplate jdbcTemplate,
    IdGenerator idGenerator) {
    this.jdbcTemplate = jdbcTemplate;
    this.idGenerator = idGenerator;
  }

  @Override
  public void add(Feedback feedback) {
    int reviewId = idGenerator.generate("rvid", "Reviews");
    jdbcTemplate.update(
      "INSERT INTO Reviews "
      + "VALUES(?, ?, ?, ?);",
      reviewId,
      feedback.getRestaurantId(),
      feedback.getOrderId(),
      feedback.getReview());
  }

  @Override
  public List<CustomerReview> getReviewsByCustomer(int customerId) {
    return jdbcTemplate.query(
      "SELECT RT.name, RV.content "
      + "FROM Orders O JOIN Reviews RV ON O.oid = RV.oid "
      + "JOIN Restaurants RT ON RT.rid = RV.rid "
      + "WHERE O.cid = ?;",
      new Object[]{ customerId },
      ((rs, rowNum) -> new CustomerReview(
        rs.getString(1),
        rs.getString(2))));
  }

  @Override
  public List<FoodReview> getReviewsByRestaurant(int restaurantId) {
    return jdbcTemplate.query(
      "SELECT U.username, R.content "
      + "FROM Orders O JOIN Reviews R ON O.oid = R.oid "
      + "JOIN Customers C ON C.cid = O.cid "
      + "JOIN Users U ON U.uid = C.cid "
      + "WHERE R.rid = ?;",
      new Object[] { restaurantId },
      ((rs, rowNum) -> new FoodReview(
        rs.getString(1),
        rs.getString(2))));
  }
}
