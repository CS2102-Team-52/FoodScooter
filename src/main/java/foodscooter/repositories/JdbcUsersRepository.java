package foodscooter.repositories;

import foodscooter.api.dtos.login.AccountDetails;
import foodscooter.model.users.User;
import foodscooter.model.users.UserType;
import foodscooter.model.users.rider.RiderType;
import foodscooter.repositories.specifications.UsersRepository;
import foodscooter.repositories.util.IdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
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
  public int add(AccountDetails accountDetails) {
    String username = accountDetails.getUsername();
    String password = accountDetails.getPassword();
    UserType userType = accountDetails.getUserType();

    int userId = idGenerator.generate("uid", "Users");

    List<Object> sqlArguments = new ArrayList<Object>() {{
      add(userId);
      add(username);
      add(password);
      add(userType.toString());
    }};

    StringBuilder sql = new StringBuilder();
    sql.append("INSERT INTO Users VALUES(?, ?, ?, ?);\n");

    switch(userType) {
      case CUSTOMER:
        addCustomer(userId, sqlArguments, sql);
        break;
      case DELIVERY_RIDER:
        addDeliveryRider(userId, accountDetails.getRiderType(), sqlArguments, sql);
        break;
      case FOOD_SCOOTER_MANAGER:
        addFoodScooterManager(userId, sqlArguments, sql);
        break;
      case RESTAURANT_STAFF:
        addRestaurantStaff(userId, accountDetails.getRestaurantId(), sqlArguments, sql);
        break;
      default:
        // will not reach here
    }

    return userId;
  }

  private void addCustomer(int userId, List<Object> sqlArguments, StringBuilder sql) {
    sql.append("INSERT INTO Customers VALUES(?);");
    sqlArguments.add(userId);
    jdbcTemplate.update(sql.toString(), sqlArguments.toArray());
  }

  private void addDeliveryRider(int userId, RiderType riderType, List<Object> sqlArguments, StringBuilder sql) {
    sql.append("INSERT INTO DeliveryRiders VALUES(?, ?);");

    int salary = 0;
    switch(riderType) {
      case FULL_TIME:
        sql.append("INSERT INTO FTRiders VALUES(?);");
        salary = 2500;
        break;
      case PART_TIME:
        sql.append("INSERT INTO PTRiders VALUES(?);");
        salary = 500;
        break;
      default:
        // will not reach here
    }

    sqlArguments.add(userId);
    sqlArguments.add(salary);
    sqlArguments.add(userId);
    jdbcTemplate.update(sql.toString(), sqlArguments.toArray());
  }

  private void addFoodScooterManager(int userId, List<Object> sqlArguments, StringBuilder sql) {
    sql.append("INSERT INTO FDSManagers VALUES(?)");
    sqlArguments.add(userId);
    jdbcTemplate.update(sql.toString(), sqlArguments.toArray());
  }

  private void addRestaurantStaff(int userId, int restaurantId, List<Object> sqlArguments, StringBuilder sql) {
    sql.append("INSERT INTO RestaurantStaff VALUES(?, ?)");
    sqlArguments.add(userId);
    sqlArguments.add(restaurantId);
    jdbcTemplate.update(sql.toString(), sqlArguments.toArray());
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
    try {
      return jdbcTemplate.queryForObject(
        "SELECT * "
          + "FROM Users U "
          + "WHERE U.username = ? AND U.password = crypt(?, U.password) ;",
        new Object[]{username, password},
        (rs, rowNum) ->
          Optional.of(new User(
            rs.getInt(1),
            UserType.map(rs.getString(4)))
          )
      );
    } catch (EmptyResultDataAccessException e) {
      return Optional.empty();
    }
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
