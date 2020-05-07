package foodscooter.api.controllers;

import foodscooter.api.dtos.login.AccountDetails;
import foodscooter.api.dtos.login.Credentials;
import foodscooter.api.dtos.login.LoginResponse;
import foodscooter.model.users.User;
import foodscooter.repositories.JdbcUsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class LoginController extends BaseController {
  private final JdbcUsersRepository usersRepository;

  @Autowired
  public LoginController(
    JdbcUsersRepository usersRepository) {
    this.usersRepository = usersRepository;
  }

  @PostMapping("/login/existing")
  public ResponseEntity<?> login(@RequestBody Credentials credentials) {
    Optional<User> user = usersRepository.get(credentials.getUsername(), credentials.getPassword());
    return user
      .map(u -> ResponseEntity.ok(new LoginResponse(u.getUserType(), u.getId())))
      .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
  }

  @PostMapping("/login/new")
  public LoginResponse createAccount(@RequestBody AccountDetails accountDetails) {
    int userId = usersRepository.add(accountDetails);
    return new LoginResponse(accountDetails.getUserType(), userId);
  }
}
