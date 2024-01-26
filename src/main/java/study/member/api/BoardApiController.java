package study.member.api;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import study.member.domain.Board;
import study.member.domain.Member;
import study.member.dto.BoardDto;
import study.member.dto.MemberDto;
import study.member.service.BoardService;
import study.member.service.MemberService;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class BoardApiController {

    private final BoardService boardService;
    private final MemberService memberService;

    @GetMapping("/board-list")
    public List<BoardDto> boardList() {
        List<Board> boards = boardService.findAll();
        return boards.stream().map(b -> new BoardDto(b))
                .collect(Collectors.toList());
    }

    @GetMapping("/board-detail/{boardId}")
    public BoardDto board_detail(@PathVariable Long boardId) {
        Board findBoard = boardService.findOne(boardId);
        return new BoardDto(findBoard);
    }

    @PostMapping("/create-board")
    public ResponseEntity create_board(@RequestBody BoardDto boardDto) {
        HttpHeaders headers = new HttpHeaders();
        Map<String, String> body = new HashMap<>();
        HttpStatus status = HttpStatus.CREATED; // 201, 잘 생성되었음
        try {
            //멤버 조회
            Member createMember = memberService.findOne(boardDto.getMember_id());
            // 게시글 객체 생성
            Board createBoard = Board.createBoard(createMember, boardDto.getTitle(), boardDto.getContent(), boardDto.getPassword(), LocalDateTime.now());
            // 게시글 저장
            boardService.save(createBoard);
        } catch (Exception e) {
            status = HttpStatus.BAD_REQUEST; // 400, 보낸사람 오류
        }
        return new ResponseEntity(body, headers, status);
    }
    @PutMapping("/update-board")
    public ResponseEntity update_board(@RequestBody BoardDto boardDto){
        System.out.println("update_board/boardDto = " + boardDto);
        HttpHeaders headers = new HttpHeaders();
        Map<String, String> body = new HashMap<>();
        HttpStatus status = HttpStatus.NO_CONTENT; // 204 -> 수정이 정상적으로 완료됬음을 의미
        try{
            Board findBoard = boardService.findOne(boardDto.getId());
            boardService.update(findBoard, boardDto.getTitle(), boardDto.getContent());
        } catch (Exception exception){
            status = HttpStatus.BAD_REQUEST; // 400 에러
            System.out.println("update_board/exception = " + exception);
        }
        return new ResponseEntity(body, headers, status);
    }

    @DeleteMapping("/delete-board")
    public void delete_board(@RequestBody BoardDto boardDto){
        try {
            boardService.delete(boardDto.getId());
        }catch(Exception exception){
            System.out.println("exception = " + exception);
        }
    }
}
