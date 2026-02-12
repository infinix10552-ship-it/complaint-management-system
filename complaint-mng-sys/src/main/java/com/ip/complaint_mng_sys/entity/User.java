package com.ip.complaint_mng_sys.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ip.complaint_mng_sys.entity.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String username;

    // IMPORTANT: Never return the password in the JSON response
    @JsonIgnore
    private String password;

    private String email;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Override
    @JsonIgnore // Prevent cluttering JSON with authorities
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    public String getActualUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() { return true; }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() { return true; }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    @JsonIgnore
    public boolean isEnabled() { return true; }
}