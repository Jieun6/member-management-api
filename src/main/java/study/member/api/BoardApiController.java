package study.member.api;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import study.member.domain.Board;
import study.member.dto.BoardDto;
import study.member.dto.MemberDto;
import study.member.service.BoardService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class BoardApiController {

    private final BoardService boardService;

    @GetMapping("/board-list")
    public List<BoardDto> boardList(){
        List<Board> boards = boardService.findAll();
        return boards.stream().map(b -> new BoardDto(b))
                .collect(Collectors.toList());
    }

    @GetMapping("/board-detail/{boardId}")
    public BoardDto board_detail(@PathVariable Long boardId){
        Board findBoard = boardService.findOne(boardId);
        return new BoardDto(findBoard);
    }

    @PostMapping("/create-board")
    public void create_board(@RequestBody BoardDto boardDto){
        try{
            boardService.save(boardDto.getMember_id(), boardDto.getTitle(), boardDto.getContent(), boardDto.getPassword());
        }catch(Exception e){
            System.out.println("e = " + e);
        }
    }
}
