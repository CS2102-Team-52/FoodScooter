package foodscooter.repositories.specifications;

import foodscooter.api.dtos.reviews.Review;
import foodscooter.model.Feedback;

import java.util.List;

public interface FeedbackRepository {
  void add(Feedback feedback);
  List<Review> fetchReviews(int restaurantId);
}
