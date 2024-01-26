package study.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import study.member.domain.Board;
import study.member.domain.Member;
import study.member.repository.MemberRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService{

    private final MemberRepository memberRepository;

    public List<Member> findAll() {
        return memberRepository.findAll();
    }

    public Member findOne(Long id) {
        return memberRepository.findById(id).orElseThrow(NullPointerException::new);
    }

    @Transactional
    public void create(Member member) {
        validateDuplicateMember(member);
        memberRepository.save(member);
    }

    private void validateDuplicateMember(Member member) {
        Optional<Member> checkMember = memberRepository.findByusername(member.getUsername());
        if(!checkMember.isEmpty()){
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }

    @Transactional
    public void update(Long id, String username, Integer age, String address) {
        Optional<Member> member = memberRepository.findById(id);
        if(!member.isEmpty()){
            throw new IllegalStateException("존재하지 않는 회원입니다");
        }
        else{
            Member updateMember = member.get();
            updateMember.setUsername(username);
            updateMember.setAge(age);
            updateMember.setAddress(address);
        }
    }

    @Transactional
    public void delete(Member member) {
        memberRepository.delete(member);
    }
}
