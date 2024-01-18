package study.member.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data // @Getter @Setter
@Table(name = "member")
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @OneToMany(mappedBy = "member")
    private List<Board> boards = new ArrayList<>();
    private String username;
    private Integer age;
    private String address;

    public Member(String username, Integer age, String address) {
        this.username = username;
        this.age = age;
        this.address = address;
    }
}
