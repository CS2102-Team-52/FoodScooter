package foodscooter.repositories;

import foodscooter.model.Rider;

import java.util.List;

public interface RiderRepository {
  List<Rider> getAll();
}
