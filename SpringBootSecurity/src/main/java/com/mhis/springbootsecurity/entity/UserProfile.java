package com.mhis.springbootsecurity.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "user_profile")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_details_id")
    private UUID UserDetailId;

    @Column(name = "first_name")
    private String FirstName;

    @Column(name = "last_name")
    private String LastName;

    @Column(name = "user_image")
    private String UserImage;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Registration userRegistration;
}
