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
    private final MemberRepository memberRepository;

    public List<Board> findAll() {
        return boardRepository.findAll();
    }

    public Board findOne(Long id) {
        return boardRepository.findById(id).orElseThrow(NullPointerException::new);
    }

    @Transactional
    public void save(Long memberId, String title, String content, Integer password){
        //멤버 조회
        Member member = memberRepository.findById(memberId).get();

        //시간 첨가
        LocalDateTime now = LocalDateTime.now();

        //게시글 생성
        Board board = Board.createBoard(member, title, content, password, now);

        //게시글 저장
        boardRepository.save(board);
    }

    public void cancel(Long id){

    }

    @Transactional
    public void update(Long id, String name){
    }
}
