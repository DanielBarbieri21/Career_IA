package com.careerai.domain.user.port;

import com.careerai.domain.user.entity.User;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository {
    Optional<User> findByEmail(String email);
    Optional<User> findByProviderAndProviderId(User.Provider provider, String providerId);
    User save(User user);
    Optional<User> findById(UUID id);
    boolean existsByEmail(String email);
}
