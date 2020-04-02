package foodscooter.api.controllers;

import foodscooter.api.dtos.AccountDetails;
import foodscooter.api.dtos.Credentials;
import foodscooter.api.dtos.LoginResponse;
import foodscooter.model.users.User;
import foodscooter.repositories.JdbcCustomersRepository;
import foodscooter.repositories.JdbcRidersRepository;
import foodscooter.repositories.JdbcUsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

import static foodscooter.model.UserType.DELIVERY_RIDER;

@RestController
public class LoginController extends BaseController {
  private JdbcUsersRepository usersRepository;
  private JdbcRidersRepository ridersRepository;
  private JdbcCustomersRepository customersRepository;

  @Autowired
  public LoginController(
    JdbcUsersRepository usersRepository,
    JdbcRidersRepository ridersRepository,
    JdbcCustomersRepository customersRepository) {
    this.usersRepository = usersRepository;
    this.ridersRepository = ridersRepository;
    this.customersRepository = customersRepository;
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
    int userId = usersRepository.add(
      accountDetails.getUsername(),
      accountDetails.getPassword(),
      accountDetails.getUserType());
    switch (accountDetails.getUserType()) {
      case DELIVERY_RIDER:
        ridersRepository.add(accountDetails.getRiderType());
        break;
      case CUSTOMER:
        customersRepository.add();
        break;
      case RESTAURANT_STAFF:
        //TODO
        break;
      case FOOD_SCOOTER_MANAGER:
        //TODO
      default:
        //will not reach here
    }
    return new LoginResponse(true, accountDetails.getUserType(), userId);
  }
}
