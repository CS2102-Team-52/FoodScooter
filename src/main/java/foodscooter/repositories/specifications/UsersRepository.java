package foodscooter.repositories.specifications;

import foodscooter.model.users.User;

import java.util.List;

public interface UsersRepository {
  List<User> getAll();
  User getUser(String username, String password);
}
