package foodscooter.repositories.specifications;

import foodscooter.model.Feedback;

import java.util.List;

public interface FeedbackRepository {
  void add(Feedback feedback);
  List<String> fetchReviews(int restaurantId);
}
