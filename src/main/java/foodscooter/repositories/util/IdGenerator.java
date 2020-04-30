package foodscooter.repositories.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class IdGenerator {
  private final JdbcTemplate jdbcTemplate;

  @Autowired
  public IdGenerator(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  /**
   * Generates an identifier for a record that is larger than the current
   * largest identifier in the {@code idColumn} of the {@code table}.
   * If the table is empty, an id of 1 is returned.
   * @param idColumn The column that stores the id attribute.
   * @param table The table with the id attribute.
   */
  public int generate(String idColumn, String table) {
    String sql = String.format("SELECT MAX(%s) FROM %s;", idColumn, table);
    int lastId = getPreviousId(sql);
    if (lastId == 0) {
      return 1;
    } else {
      return lastId + 1;
    }
  }

  private int getPreviousId(String sql) {
    Integer id = jdbcTemplate.queryForObject(sql, ((rs, rowNum) -> rs.getInt(1)));
    assert id != null; //to suppress NullPointerException warning
    return id;
  }
}
