package com.ip.complaint_mng_sys.repo;

import com.ip.complaint_mng_sys.entity.User;
import jdk.jfr.Registered;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo  extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
}