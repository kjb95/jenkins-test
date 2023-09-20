package movierankchart.domain.users.controller;

import lombok.RequiredArgsConstructor;
import movierankchart.domain.users.dto.request.UpdateUserChatRoomRequestDto;
import movierankchart.domain.users.dto.response.FindUsersResponseDto;
import movierankchart.domain.users.service.UsersService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@RequestMapping("/v1/users")
public class UsersController {
    private final UsersService usersService;

    @PatchMapping("/{usersId}")
    public ResponseEntity<Void> updateUserChatRoom(@PathVariable Long usersId, @Valid @RequestBody UpdateUserChatRoomRequestDto updateUserChatRoomRequestDto) {
        usersService.updateUserChatRoom(usersId, updateUserChatRoomRequestDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<FindUsersResponseDto> findUsers() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.ok().build();
        }
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        FindUsersResponseDto findUsersResponseDto = usersService.findUsers(userDetails.getUsername());
        return ResponseEntity.ok(findUsersResponseDto);
    }
}
