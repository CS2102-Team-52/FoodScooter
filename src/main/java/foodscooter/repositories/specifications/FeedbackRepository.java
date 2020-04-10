package foodscooter.repositories.specifications;

import foodscooter.model.reviews.Review;
import foodscooter.model.reviews.Feedback;

import java.util.List;

public interface FeedbackRepository {
  void add(Feedback feedback);
  List<Review> fetchReviews(int restaurantId);
}
