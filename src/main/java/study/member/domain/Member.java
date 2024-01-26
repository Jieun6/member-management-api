package study.member.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data // @Getter @Setter @ToString @RequireArgsConstructor @Equal
@Table(name = "member")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    // 멤버는 여러개의 게시글을 가질 수 있다. 게시글은 하나의 멤버만 가질 수 있다. One(Member) to Many(Board)
    @OneToMany(mappedBy = "member", cascade = {CascadeType.ALL})
    private List<Board> boards = new ArrayList<>();
    private String username;
    private Integer age;
    private String address;

    public Member(String username, Integer age, String address) {
        this.username = username;
        this.age = age;
        this.address = address;
    }

    // 여기에 연관관계 메소드가 필요없는 이유
    // 우리가 멤버에 게시판을 추가해줄일은 없음
    // 게시글이 추가되면서 멤버의 게시글목록에 게시글을 넣어줄뿐
}
