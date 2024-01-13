package study.member.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data // @Getter @Setter
@Table(name = "member")
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private Integer age;
    private String address;

    public Member(String username, Integer age, String address) {
        this.username = username;
        this.age = age;
        this.address = address;
    }
}
