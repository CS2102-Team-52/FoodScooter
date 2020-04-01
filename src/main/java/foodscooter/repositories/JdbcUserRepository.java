package foodscooter.repositories;

import foodscooter.model.Customer;
import foodscooter.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class JdbcUserRepository implements UserRepository {
  @Autowired
  public JdbcTemplate jdbcTemplate;

  @Override
  public List<User> getAll() {
    return jdbcTemplate.query(
      "SELECT * FROM Users;",
      ((rs, rowNum) -> new User(rs.getInt(1), rs.getString(2), rs.getString(3))));
  }

  @Override
  public User getUser(String username, String password) {
    /*
    return jdbcTemplate.queryForObject(
      "SELECT uid FROM Users U WHERE U.username = ? and U.password = ? ;",
      new Object[] { username, password },
      ((rs, rowNum) -> new User(rs.getInt(1), username, password)));
      */
    return new User(1, username, password);
  }
}
