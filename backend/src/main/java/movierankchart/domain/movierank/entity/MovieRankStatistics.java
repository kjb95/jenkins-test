package movierankchart.domain.movierank.entity;

import lombok.*;
import movierankchart.domain.kobis.constants.KobisConstants;
import movierankchart.domain.kobis.dto.KobisBoxOfficeResponseDto;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Embeddable
public class MovieRankStatistics {
    @Column(nullable = false)
    private Integer rankIncrement;
    @Column(columnDefinition = "tinyint(1)", nullable = false)
    private boolean isNewRank;
    @Column(nullable = false)
    private Long audienceCount;
    @Column(nullable = false)
    private Long sales;
    @Column(nullable = false)
    private Long screeningsCount;
    @Column(nullable = false)
    private Long theatersCount;

    public static MovieRankStatistics fromDto(KobisBoxOfficeResponseDto kobisBoxOfficeResponseDto) {
        MovieRankStatistics movieRankStatistics = new MovieRankStatistics();
        movieRankStatistics.rankIncrement = Integer.parseInt(kobisBoxOfficeResponseDto.getRankInten());
        movieRankStatistics.isNewRank = kobisBoxOfficeResponseDto.getRankOldAndNew()
                .equals(KobisConstants.RANK_NEW) ? true : false;
        movieRankStatistics.audienceCount = Long.parseLong(kobisBoxOfficeResponseDto.getAudiCnt());
        movieRankStatistics.sales = Long.parseLong(kobisBoxOfficeResponseDto.getSalesAmt());
        movieRankStatistics.screeningsCount = Long.parseLong(kobisBoxOfficeResponseDto.getScrnCnt());
        movieRankStatistics.theatersCount = Long.parseLong(kobisBoxOfficeResponseDto.getShowCnt());
        return movieRankStatistics;
    }
}
