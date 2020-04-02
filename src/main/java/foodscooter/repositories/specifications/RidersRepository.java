package foodscooter.repositories.specifications;

import foodscooter.model.RiderType;
import foodscooter.model.users.Rider;

import java.util.List;

public interface RidersRepository {
  void add(RiderType riderType);
  List<Rider> getAll();
  boolean checkFullTime(int rid);
  boolean checkPartTime(int rid);
}
