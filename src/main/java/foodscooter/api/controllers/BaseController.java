package foodscooter.api.controllers;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class BaseController {
}
