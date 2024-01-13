package study.member.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import study.member.domain.Member;

@Data
@NoArgsConstructor
public class MemberDto {
    private Long id;
    private String username;
    private Integer age;
    private String address;

    public MemberDto(Member member) {
        this.id = member.getId();
        this.username = member.getUsername();
        this.age = member.getAge();
        this.address = member.getAddress();
    }
}
