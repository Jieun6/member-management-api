package study.member.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import study.member.domain.Member;
import study.member.repository.MemberRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class JpaMemberService implements MemberService {

    private final MemberRepository memberRepository;
    @Override
    public List<Member> findAll() {
        return memberRepository.findAll();
    }

    @Override
    public Member findOne(Long id) {
        return memberRepository.findById(id).orElseThrow(NullPointerException::new);
    }

    @Override
    @Transactional
    public void create(Member member) {
        memberRepository.save(member);
    }

    @Transactional
    @Override
    public void update(Long id, String username, Integer age, String address) {
        Member member = memberRepository.findById(id).get();
        member.setUsername(username);
        member.setAge(age);
        member.setAddress(address);
    }

    @Override
    public void delete(Member member) {
        memberRepository.delete(member);
    }

}
