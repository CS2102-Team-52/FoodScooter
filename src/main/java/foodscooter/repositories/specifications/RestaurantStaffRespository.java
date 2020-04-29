package foodscooter.repositories.specifications;

import foodscooter.model.restaurants.Restaurant;

public interface RestaurantStaffRespository {
  Restaurant getEmployingRestaurant(int staffId);
}
