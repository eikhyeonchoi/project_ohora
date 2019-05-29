package bitcamp.team.web.json;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("json/SerachController")
@RequestMapping("/json/search")
public class SerachController {

	@GetMapping("list")
	  public Object list(String keyword, String searchType) {
		return null;
	  }
}
