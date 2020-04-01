package foodscooter.repositories.specifications;

import foodscooter.model.Review;

public interface CustomerReviewsRepository {
  void add(int customerId, Review review);
}
