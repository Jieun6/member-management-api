package study.member.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import study.member.domain.Member;
import study.member.dto.MemberDeleteDto;
import study.member.dto.MemberDto;
import study.member.service.MemberService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MemberApiController {

    private final MemberService memberService;

    @GetMapping("/member-list")
    public List<MemberDto> member_list(){
        List<Member> members = memberService.findAll();
        return members.stream().map(b -> new MemberDto(b))
                .collect(Collectors.toList());
    }

    @GetMapping("/member-detail/{memberId}")
    public MemberDto member_detail(@PathVariable Long memberId){
        Member findMember = memberService.findOne(memberId);
        return new MemberDto(findMember);
    }

    @PostMapping("/create-member")
    public MemberDto create_member(@RequestBody MemberDto memberDto){
        System.out.println("memberDto = " + memberDto);
        HttpHeaders headers = new HttpHeaders();
        Map<String, String> body = new HashMap<>();
        HttpStatus status = HttpStatus.CREATED; // 201 잘생성됨
        try{
            Member member = new Member(
                    memberDto.getUsername(),
                    memberDto.getAge(),
                    memberDto.getAddress()
            );
            memberService.create(member);
        }catch(Exception exception){
            status = HttpStatus.BAD_REQUEST;
            System.out.println("exception = " + exception);
        }
        //return new ResponseEntity(body, headers, status);
        return memberDto;
    }

    @PutMapping("/update-member")
    public MemberDto update_member(@RequestBody MemberDto memberDto){
        System.out.println("memberDto = " + memberDto);
        try{
            memberService.update(memberDto.getId(), memberDto.getUsername(), memberDto.getAge(), memberDto.getAddress());
        } catch(Exception exception){
            System.out.println("exception = " + exception);
        }
        return memberDto;
    }

    @DeleteMapping("/delete-member")
    public ResponseEntity delete_member(@RequestBody MemberDeleteDto memberDeleteDto){
        System.out.println("memberDeleteDto = " + memberDeleteDto);
        HttpHeaders headers = new HttpHeaders();
        Map<String, String> body = new HashMap<>();
        HttpStatus status = HttpStatus.NO_CONTENT;
        try{
            Member member = memberService.findOne(memberDeleteDto.getId());
            memberService.delete(member);
        }catch (Exception exception){
            status = HttpStatus.BAD_REQUEST;
            System.out.println("exception = " + exception);
        }
        return new ResponseEntity(body, headers, status);
    }
}
