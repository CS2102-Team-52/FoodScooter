package foodscooter.repositories;

import foodscooter.model.UserType;
import foodscooter.model.users.User;
import foodscooter.repositories.specifications.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class JdbcUsersRepository implements UsersRepository {
  private JdbcTemplate jdbcTemplate;

  @Autowired
  public JdbcUsersRepository(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  @Override
  public int add(String username, String password, UserType userType) {
    int userId = generateUserId();
    jdbcTemplate.update(
      "INSERT INTO Users VALUES (?, ?, ?, ?)",
      userId, username, password, userType.toString());
    return userId;
  }

  private int generateUserId() {
    int lastId = getPreviousUserId();
    if (lastId == 0) {
      return 1;
    } else {
      return lastId + 1;
    }
  }

  private int getPreviousUserId() {
    Integer id = jdbcTemplate.queryForObject(
      "SELECT MAX(uid) FROM Users",
      ((rs, rowNum) -> rs.getInt(1))
    );
    assert id != null; //to suppress NullPointerException warning
    return id;
  }

  @Override
  public List<User> getAll() {
    return jdbcTemplate.query(
      "SELECT * FROM Users;",
      ((rs, rowNum) -> new User(
        rs.getInt(1),
        rs.getString(2),
        rs.getString(3),
        UserType.valueOf(rs.getString(4)))));
  }

  @Override
  public Optional<User> get(String username, String password) {
    return jdbcTemplate.queryForObject(
      "SELECT * FROM Users U WHERE U.username = ? and U.password = ? ;",
      new Object[] { username, password },
      ((rs, rowNum) -> {
        int userId = rs.getInt(1);
        if (userId == 0) {
          return Optional.empty();
        }
        User user = new User(
          userId,
          rs.getString(2),
          rs.getString(3),
          UserType.map(rs.getString(4)));
        return Optional.of(user);
      }));
  }
}
