package study.member.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.boot.autoconfigure.web.WebProperties;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "board")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Board {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String content;

    private Integer likeNum;

    private Integer password;

    private LocalDateTime dateTime;

    //==생성자==//
    public Board(String title, String content, Integer password) {
        this.likeNum = 0;
        this.title = title;
        this.content = content;
        this.password = password;
    }

    //==연관관계 메서드==//
    public void setMember(Member member){
        this.member = member;
        member.getBoards().add(this);
    }

    //==생성 메서드==//
    public static Board createBoard(Member member, String title, String content, Integer password, LocalDateTime localDateTime){
        Board board = new Board(title, content, password);
        board.setMember(member);
        board.setDateTime(localDateTime);
        return board;
    }

}
