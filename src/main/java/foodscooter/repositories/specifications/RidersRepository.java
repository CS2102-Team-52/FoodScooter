package foodscooter.repositories.specifications;

import foodscooter.model.users.Rider;

import java.util.List;

public interface RidersRepository {
  List<Rider> getAll();
  boolean checkFullTime(int rid);
  boolean checkPartTime(int rid);
}
