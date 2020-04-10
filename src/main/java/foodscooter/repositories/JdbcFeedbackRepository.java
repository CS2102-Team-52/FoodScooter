package foodscooter.repositories;

import foodscooter.model.reviews.Review;
import foodscooter.model.reviews.Feedback;
import foodscooter.repositories.specifications.FeedbackRepository;
import foodscooter.repositories.util.IdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class JdbcFeedbackRepository implements FeedbackRepository {
  private JdbcTemplate jdbcTemplate;
  private IdGenerator idGenerator;

  @Autowired
  public JdbcFeedbackRepository(
    JdbcTemplate jdbcTemplate,
    IdGenerator idGenerator) {
    this.jdbcTemplate = jdbcTemplate;
    this.idGenerator = idGenerator;
  }

  @Override
  public void add(Feedback feedback) {
    int feedbackId = idGenerator.generate("fid", "Feedback");
    jdbcTemplate.update(
      "INSERT INTO Feedback "
      + "VALUES(?, ?, ?, ?, ?);",
      feedbackId,
      feedback.getRestaurantId(),
      feedback.getOrderId(),
      feedback.getRating(),
      feedback.getReview());
  }

  @Override
  public List<Review> fetchReviews(int restaurantId) {
    return jdbcTemplate.query(
      "SELECT O.cid, F.review "
      + "FROM Orders O JOIN Feedback F ON O.oid = F.oid "
      + "WHERE F.rid = ?;",
      new Object[] { restaurantId },
      ((rs, rowNum) -> new Review(
        rs.getString(1),
        rs.getString(2))));
  }
}
