package foodscooter.repositories;

import foodscooter.model.users.User;
import foodscooter.model.users.UserType;
import foodscooter.repositories.specifications.UsersRepository;
import foodscooter.repositories.util.IdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class JdbcUsersRepository implements UsersRepository {
  private final JdbcTemplate jdbcTemplate;
  private final IdGenerator idGenerator;

  @Autowired
  public JdbcUsersRepository(
    JdbcTemplate jdbcTemplate,
    IdGenerator idGenerator) {
    this.jdbcTemplate = jdbcTemplate;
    this.idGenerator = idGenerator;
  }

  @Override
  public int add(String username, String password, UserType userType) {
    int userId = idGenerator.generate("uid", "Users");
    jdbcTemplate.update(
      "INSERT INTO Users "
      + " VALUES (?, ?, ?, ?)",
      userId, username, password, userType.toString());
    return userId;
  }

  @Override
  public List<User> getAll() {
    return jdbcTemplate.query(
      "SELECT * FROM Users;",
      ((rs, rowNum) -> new User(
        rs.getInt(1),
        UserType.valueOf(rs.getString(4)))));
  }

  @Override
  public Optional<User> get(String username, String password) {
    return jdbcTemplate.queryForObject(
      "SELECT * "
      + "FROM Users U "
      + "WHERE U.username = ? AND U.password = digest(?, 'sha1') ;",
      new Object[] { username, password },
      ((rs, rowNum) -> {
        int userId = rs.getInt(1);
        if (userId == 0) {
          return Optional.empty();
        }
        User user = new User(
          userId,
          UserType.map(rs.getString(4)));
        return Optional.of(user);
      }));
  }

  @Override
  public Optional<User> get(int uid) {
    return jdbcTemplate.queryForObject(
      "SELECT * "
      + "FROM Users U "
      + "WHERE U.uid = ? ;",
      new Object[] { uid },
      ((rs, rowNum) -> {
        int userId = rs.getInt(1);
        if (userId == 0) {
          return Optional.empty();
        }
        User user = new User(
          userId,
          UserType.map(rs.getString(4)));
        return Optional.of(user);
      }));
  }
}
