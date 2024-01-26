package study.member.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import study.member.domain.Board;
import study.member.domain.Member;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class BoardDto {

    private Long id;

    private Long member_id;

    private String title;

    private String content;

    private Integer likeNum;

    private Integer password;

    private LocalDateTime orderDate;

    public BoardDto(Board board){
        this.id = board.getId();
        this.member_id = board.getMember().getId();
        this.title = board.getTitle();
        this.content = board.getContent();
        this.likeNum = board.getLikeNum();
        this.password = board.getPassword();
        this.orderDate = board.getDateTime();
    }
}
