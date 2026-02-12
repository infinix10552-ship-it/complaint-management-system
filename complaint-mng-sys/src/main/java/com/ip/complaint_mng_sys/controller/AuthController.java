//package com.ip.complaint_mng_sys.controller;
//
//import com.ip.complaint_mng_sys.dto.LoginRequest;
//import com.ip.complaint_mng_sys.dto.RegisterRequest;
//import com.ip.complaint_mng_sys.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import static org.springframework.http.HttpStatus.OK;
//
//@RestController
//@RequestMapping("/auth")
//public class AuthController {
//
//    @Autowired
//    private UserService userService;
//
//    @PostMapping("/register")
//    public String register(@RequestBody RegisterRequest request) {
//         new ResponseEntity<>(userService.register(request), OK);
//         return "User registered successfully";
//    }
//
//    @PostMapping("/login")
//    public String login(@RequestBody LoginRequest request) {
//
//        return userService.login(request).getUsername() + " logged in successfully";
//
//    }
//}




package com.ip.complaint_mng_sys.controller;

import com.ip.complaint_mng_sys.dto.AuthenticationResponse;
import com.ip.complaint_mng_sys.dto.LoginRequest;
import com.ip.complaint_mng_sys.dto.RegisterRequest;
import com.ip.complaint_mng_sys.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(new AuthenticationResponse(userService.register(request)));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(new AuthenticationResponse(userService.login(request)));
    }
}