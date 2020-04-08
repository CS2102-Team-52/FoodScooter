package foodscooter.repositories.util;

import org.springframework.jdbc.core.JdbcTemplate;

public class IdGenerator {
  public static int generate(JdbcTemplate jdbcTemplate, String table, String idColumn) {
    int lastId = getPreviousUserId(jdbcTemplate, table, idColumn);
    if (lastId == 0) {
      return 1;
    } else {
      return lastId + 1;
    }
  }

  private static int getPreviousUserId(JdbcTemplate jdbcTemplate, String table, String idColumn) {
    Integer id = jdbcTemplate.queryForObject(
      "SELECT MAX(?) FROM ?;",
      new Object[] { idColumn, table},
      ((rs, rowNum) -> rs.getInt(1))
    );
    assert id != null; //to suppress NullPointerException warning
    return id;
  }
}
