package foodscooter.api.controllers;

import foodscooter.api.dtos.login.AccountDetails;
import foodscooter.api.dtos.login.Credentials;
import foodscooter.api.dtos.login.LoginResponse;
import foodscooter.model.users.User;
import foodscooter.model.users.UserType;
import foodscooter.model.users.rider.RiderType;
import foodscooter.repositories.JdbcRidersRepository;
import foodscooter.repositories.JdbcUsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
  public LoginResponse login(@RequestBody Credentials credentials) {
    Optional<User> user = usersRepository.get(credentials.getUsername(), credentials.getPassword());
    return user
      .map(u -> new LoginResponse(true, u.getUserType(), u.getId()))
      .orElseGet(LoginResponse::fail);
  }

  @PostMapping("/login/new")
  public LoginResponse createAccount(@RequestBody AccountDetails accountDetails) {
    int userId = usersRepository.add(accountDetails);
    return new LoginResponse(true, accountDetails.getUserType(), userId);
  }
}
