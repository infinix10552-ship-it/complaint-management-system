//package com.ip.complaint_mng_sys.service;
//
//import com.ip.complaint_mng_sys.dto.LoginRequest;
//import com.ip.complaint_mng_sys.dto.RegisterRequest;
//import com.ip.complaint_mng_sys.entity.User;
//import com.ip.complaint_mng_sys.entity.enums.Role;
//import com.ip.complaint_mng_sys.repo.UserRepo;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.web.bind.annotation.RequestBody;
//
//@Service
//public class UserService {
//
//    @Autowired
//    private UserRepo userRepo;
//
//    public User register(@RequestBody RegisterRequest request) {
//        User user = new User();
//        user.setUsername(request.name);
//        user.setPassword(request.password);
//        user.setEmail(request.email);
//        user.setRole(Role.USER);
//
//        return userRepo.save(user);
//    }
//
//
//    public User login(@RequestBody LoginRequest request) {
//
//        User user = userRepo.findByEmail(request.email).orElseThrow(() -> new RuntimeException("User not found"));
//
//        if (!user.getPassword().equals(request.password)) {
//            throw new RuntimeException("Invalid password");
//        }
//
//        return user;
//    }
//}

package com.ip.complaint_mng_sys.service;

import com.ip.complaint_mng_sys.config.JwtService;
import com.ip.complaint_mng_sys.dto.LoginRequest;
import com.ip.complaint_mng_sys.dto.RegisterRequest;
import com.ip.complaint_mng_sys.entity.User;
import com.ip.complaint_mng_sys.entity.enums.Role;
import com.ip.complaint_mng_sys.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public String register(RegisterRequest request) {
        User user = new User();
        user.setUsername(request.name);
        user.setEmail(request.email);
        user.setPassword(passwordEncoder.encode(request.password)); // Encrypt password
        user.setRole(Role.USER);

        userRepo.save(user);

        Map<String, Object> claims = Map.of(
                "id", user.getId(),
                "role", user.getRole().name()
        );
        return jwtService.generateToken(claims, user);
    }

    public String login(LoginRequest request) {
        // This will verify the email and password automatically.
        // If it fails, it throws an exception (BadCredentials), preventing the 403 confusion.
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email,
                        request.password
                )
        );

        User user = userRepo.findByEmail(request.email)
                .orElseThrow();

        Map<String, Object> claims = Map.of(
                "id", user.getId(),
                "role", user.getRole().name()
        );

        return jwtService.generateToken(user);
    }
}