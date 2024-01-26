package study.member.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.hibernate.query.Order;
import org.springframework.stereotype.Service;
import study.member.domain.Board;
import study.member.domain.Member;
import study.member.repository.BoardRepository;
import study.member.repository.MemberRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@org.springframework.transaction.annotation.Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    public List<Board> findAll() {
        return boardRepository.findAll();
    }

    public Board findOne(Long id) {
        return boardRepository.findById(id).orElseThrow(NullPointerException::new);
    }

    @Transactional
    public void save(Board board){
        boardRepository.save(board);
    }

    @Transactional
    public void update(Board board, String title, String content){
        board.setTitle(title);
        board.setContent(content);
        board.setDateTime(LocalDateTime.now());
    }

    @Transactional
    public void delete(Long id){
        Board board = this.findOne(id);
        boardRepository.delete(board);
    }
}
