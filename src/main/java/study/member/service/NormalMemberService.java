package study.member.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import study.member.domain.Member;
import study.member.repository.MemberRepository;
import study.member.repository.NormalMemberRepository;

import java.util.List;

//@Service
@Transactional
@RequiredArgsConstructor
public class NormalMemberService implements MemberService {


    private final NormalMemberRepository normalMemberRepository;

    @Override
    public List<Member> findAll() {
        return normalMemberRepository.findAll();
    }

    @Override
    public Member findOne(Long id) {
        return normalMemberRepository.find(id);
    }

    @Override
    public void create(Member member) {

    }

    @Override
    public void update(Long id, String username, Integer age, String address) {

    }

    @Override
    public void delete(Member member) {

    }

}
