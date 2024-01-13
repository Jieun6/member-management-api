package study.member.service;

import study.member.domain.Member;

import java.util.List;

public interface MemberService {

    public List<Member> findAll();

    public Member findOne(Long id);

    public void create(Member member);

    public void update(Long id, String username, Integer age, String address);

    public void delete(Member member);
}
