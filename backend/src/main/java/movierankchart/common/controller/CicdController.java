package movierankchart.common.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/cicd")
public class CicdController {
    private final Environment environment;

    @GetMapping("/profile")
    public String getProfile() {
        return "hihi";
//        return Arrays.stream(environment.getActiveProfiles())
//                .findFirst()
//                .orElse("");
    }
}
