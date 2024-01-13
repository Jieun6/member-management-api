package study.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import study.member.domain.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {

}
