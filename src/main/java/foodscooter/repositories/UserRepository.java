package foodscooter.repositories;

import foodscooter.model.User;

import java.util.List;

public interface UserRepository {
  List<User> getAll();
  User getUser(String username, String password);
}
