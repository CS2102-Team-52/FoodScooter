package foodscooter.repositories.specifications;

import foodscooter.model.reviews.CustomerReview;
import foodscooter.model.reviews.FoodReview;
import foodscooter.model.reviews.Feedback;

import java.util.List;

public interface ReviewsRepository {
  void add(Feedback feedback);
  List<CustomerReview> getReviewsByCustomer(int customerId);
  List<FoodReview> getReviewsByRestaurant(int restaurantId);
}
