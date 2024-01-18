package study.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import study.member.domain.Board;

public interface BoardRepository extends JpaRepository<Board, Long> {

}
