package com.mhis.springbootsecurity.repository;

import com.mhis.springbootsecurity.entity.Registration;
import com.mhis.springbootsecurity.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface IUserProfileRepository extends JpaRepository<UserProfile, UUID> {
    Optional<UserProfile> findByUserRegistration_RegistrationId(UUID id);

}
