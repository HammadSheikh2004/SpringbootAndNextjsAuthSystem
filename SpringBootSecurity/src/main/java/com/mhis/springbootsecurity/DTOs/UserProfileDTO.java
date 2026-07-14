package com.mhis.springbootsecurity.DTOs;

import com.mhis.springbootsecurity.entity.Registration;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;


import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileDTO {
    private UUID UserDetailId;

    private String FirstName;

    private String LastName;

    private MultipartFile UserImage;

}
